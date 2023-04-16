import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
  HttpErrors,
} from '@loopback/rest';
import {inject} from '@loopback/core';
import {User} from '../models';
import {UserRepository} from '../repositories';
import {JWTService} from '../services/jwt-service';
import {PasswordHasher} from '../services/password-hasher';
import {EmailService} from '../services/email.service';
import {Credentials} from '../models/credentials.model';
import { validatePassword, validateEmail } from '../utils/validation';

export class UserController {
  constructor(
    @repository(UserRepository)
    public userRepository : UserRepository,
    @inject('services.jwt-service')
    public jwtService: JWTService,
    @inject('services.password-hasher')
    public passwordHasher: PasswordHasher,
    @inject('services.EmailService')
    private emailService: EmailService,
  ) {
    if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not set in the environment variables');
    }
  }

  // Méthode d'inscription
  @post('/users/signup')
  async signUp(@requestBody() userData: User) {
    validateEmail(userData.email);
    validatePassword(userData.password);
    
    try {
      const password = await this.passwordHasher.hashPassword(
        userData.password,
        12,
      );
      const savedUser = await this.userRepository.create({
        ...userData,
        password,
        emailVerified: false,
      });

      const token = this.jwtService.generateToken(
        {userId: savedUser.id},
        process.env.JWT_SECRET!,
        '24h',
      );

      await this.emailService.sendVerificationEmail(savedUser.email, token);

      return {
        message: 'User created successfully. A verification email has been sent.',
      };
    } catch (error) {
      if (error.code === '23505' && error.constraint === 'uniqueEmail') {
        throw new HttpErrors.Conflict('Cette adresse e-mail est déjà utilisée');
      } else {
        throw error;
      }
    }
  }

  // Méthode de connexion
  @post('/users/login')
  async login(@requestBody() credentials: Credentials) {
    const foundUser = await this.userRepository.findOne({
      where: {email: credentials.email},
    });

    if (!foundUser || !(await this.passwordHasher.comparePassword(credentials.password, foundUser.password))) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      throw new HttpErrors.Unauthorized('Invalid credentials');
    }

    const passwordMatch = await this.passwordHasher.comparePassword(
      credentials.password,
      foundUser.password,
    );

    if (!passwordMatch) {
      throw new HttpErrors.Unauthorized('Invalid credentials');
    }

    if (!foundUser.emailVerified) {
      throw new HttpErrors.Unauthorized('Email not verified');
    }
    
    const token = this.jwtService.generateToken(
      {userId: foundUser.id},
      process.env.JWT_SECRET!,
      '24h',
    );

    return {
      message: 'Login successful',
      token,
    };
  }

  // Méthode de vérification d'e-mail
  @get('/users/verify-email')
  async verifyEmail(@param.query.string('token') token: string) {

    const decoded = this.jwtService.verifyToken(token, process.env.JWT_SECRET!);

    if (!decoded || typeof decoded === 'string' || !decoded.userId) {
      throw new HttpErrors.Unauthorized('Invalid token');
    }

    const user = await this.userRepository.findById(decoded.userId);

    if (!user) {
      throw new HttpErrors.NotFound('User not found');
    }

    if (user.emailVerified) {
      return {message: 'Email already verified'};
    }

    user.emailVerified = true;
    await this.userRepository.updateById(decoded.userId, user);

    return {message: 'Email successfully verified'};
  }

  @get('/users/count')
  @response(200, {
    description: 'User model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(User) where?: Where<User>,
  ): Promise<Count> {
    return this.userRepository.count(where);
  }

  @get('/users')
  @response(200, {
    description: 'Array of User model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(User, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(User) filter?: Filter<User>,
  ): Promise<User[]> {
    return this.userRepository.find(filter);
  }

  @patch('/users')
  @response(200, {
    description: 'User PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: User,
    @param.where(User) where?: Where<User>,
  ): Promise<Count> {
    return this.userRepository.updateAll(user, where);
  }

  @get('/users/{id}')
  @response(200, {
    description: 'User model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(User, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(User, {exclude: 'where'}) filter?: FilterExcludingWhere<User>
  ): Promise<User> {
    return this.userRepository.findById(id, filter);
  }

  @patch('/users/{id}')
  @response(204, {
    description: 'User PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: User,
  ): Promise<void> {
    await this.userRepository.updateById(id, user);
  }

  @put('/users/{id}')
  @response(204, {
    description: 'User PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() user: User,
  ): Promise<void> {
    await this.userRepository.replaceById(id, user);
  }

  @del('/users/{id}')
  @response(204, {
    description: 'User DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.userRepository.deleteById(id);
  }
}

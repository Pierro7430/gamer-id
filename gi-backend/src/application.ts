import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {MySequence} from './sequence';
import {PostgresSqlDataSource} from './datasources';
import {JWTService} from './services/jwt-service';
import {PasswordHasher} from './services/password-hasher';
import {EmailService} from './services/email.service';
import {SteamService} from './services/steam.service';

export {ApplicationConfig};

export class GiBackendApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    this.dataSource(PostgresSqlDataSource, 'PostgresSQL');

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
    this.bind('services.jwt-service').toClass(JWTService);
    this.bind('services.password-hasher').toClass(PasswordHasher);
    this.bind('services.email').toClass(EmailService);
    this.bind('services.steam').toClass(SteamService);
  }
}

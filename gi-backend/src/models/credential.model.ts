import {model, property} from '@loopback/repository';

@model()
export class Credential {
  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;
}
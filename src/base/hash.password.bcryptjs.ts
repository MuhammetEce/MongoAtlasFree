import { Supplier } from './Supplier';
import { Inject, Injectable } from '@nestjs/common';
import { genSalt, hash, compare } from 'bcryptjs';
import { randomBytes } from 'crypto';

/**
 * Service HashPassword using module 'bcryptjs'.
 * It takes in a plain password, generates a salt with given
 * round and returns the hashed password as a string
 */
export type HashPassword = (
  password: string,
  rounds: number,
) => Promise<string>;
// bind function to `services.bcryptjs.HashPassword`
export async function hashPassword(
  password: string,
  rounds: number,
): Promise<string> {
  const salt = await genSalt(rounds);
  return hash(password, salt);
}

export interface PasswordHasher<T = string> {
  hashPassword(password: T): Promise<T>;
  comparePassword(providedPass: T, storedPass: T): Promise<boolean>;
}

@Injectable()
export class BcryptHasher implements PasswordHasher<string> {
  constructor(@Inject('CONFIG_APP') private appConfig: Supplier) {}

  async hashPassword(password: string): Promise<string> {
    const { rounds } = this.appConfig.get<any>('crypt');

    const salt = await genSalt(rounds);
    return hash(password, salt);
  }

  randomBytes(n: number) {
    return randomBytes(n);
  }

  async comparePassword(
    providedPass: string,
    storedPass: string,
  ): Promise<boolean> {
    const passwordIsMatched = await compare(providedPass, storedPass);
    return passwordIsMatched;
  }
}

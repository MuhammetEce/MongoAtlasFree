import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class GetProfileDTO {
  @Expose()
  _id: any;

  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  is_banned: boolean;

  @Expose()
  is_deleted: boolean;
}

export class UpdateProfileDTO {
  @ApiProperty({
    description: 'user new name',
    default: 'muhammet',
    required: true,
  })
  @IsNotEmpty({ message: () => 'name cannot be empty!' })
  name: string;
}

export class UpdatePasswordDTO {
  @ApiProperty({
    description: 'exist password',
    default: 'Aa123456789',
    required: true,
  })
  @IsNotEmpty({ message: () => 'old password cannot be empty!' })
  oldPassword: string;

  @ApiProperty({
    description: 'new password',
    default: 'Ab123456789',
    required: true,
  })
  @IsNotEmpty({ message: () => 'new password cannot be empty!' })
  newPassword: string;

  @ApiProperty({
    description: 'new password confirm',
    default: 'Ab123456789',
    required: true,
  })
  @IsNotEmpty({ message: () => 'new password confirm cannot be empty!' })
  newPasswordConfirm: string;
}

export class UserProfileResponseDTO {
  _id?: string;
  name?: string;
  email?: string;
}

export class UserProfileUpdateResponseDTO {
  name?: string;
}

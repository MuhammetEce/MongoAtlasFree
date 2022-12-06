import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ApiResponse } from '../base/helpers/APICallMapper';
import { User } from '../base/decorators/logged-in-user.decorator';
import { IUser } from './interfaces/User';
import { UserService } from './user.service';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import {
  UpdateProfileDTO,
  UpdatePasswordDTO,
  UserProfileResponseDTO,
  UserProfileUpdateResponseDTO,
} from './dto/user.dto';
import { catchHandler } from '../base/helpers/exception';

@ApiTags('user')
@ApiBearerAuth('authorization')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({
    description: `This api returns user own profile.<br>
      User's access_token must send from header as authorization.`,
  })
  @Get('profile')
  async profile(
    @User() user: IUser,
  ): Promise<ApiResponse<UserProfileResponseDTO>> {
    const profile: UserProfileResponseDTO = await this.userService.findById(
      user.id,
      '_id name email',
    );
    return new ApiResponse(profile);
  }

  @ApiOperation({
    description: `This api updates user profile.<br>
      User's access_token must send from header as authorization.<br>
      Body can only include UpdateProfileDTO values. Please check UpdateProfileDTO to see required values.`,
  })
  @Put('profile')
  async updateProfile(
    @User() user: IUser,
    @Body() body: UpdateProfileDTO,
  ): Promise<ApiResponse<UserProfileUpdateResponseDTO>> {
    await this.userService.updateById(user.id, body);

    return new ApiResponse(body);
  }

  @ApiOperation({
    description: `This api removes user profile.<br>
      User's access_token must send from header as authorization.`,
  })
  @Delete('profile')
  async deleteProfile(@User() user: IUser): Promise<ApiResponse<boolean>> {
    try {
      const body = {
        name: '*****',
        surname: '*****',
        email: `${user.id}*****@**.com`,
        phone: `${user.id}*****`,
        access_token: '',
        refresh_token: '',
        reset_password_token: '',
        facebook: {
          access_token: `${user.id}*****`,
          id: `${user.id}*****`,
        },
        google: {
          access_token: `${user._id}*****`,
          id: `${user._id}*****`,
        },
        is_deleted: true,
      };
      await this.userService.updateById(user.id, body);

      return new ApiResponse(true);
    } catch (error) {
      catchHandler({
        status: error.status ? error.status : 500,
        message: error.message ? error.message : error,
      });
    }
  }

  @ApiOperation({
    description: `This api updates user password.<br>
      User's access_token must send from header as authorization.<br>
      Body can only include UpdatePasswordDTO values. Please check UpdatePasswordDTO to see required values.`,
  })
  @Post('change/password')
  async changePassword(
    @User() user: IUser,
    @Body() body: UpdatePasswordDTO,
  ): Promise<ApiResponse<boolean>> {
    const result = await this.userService.changePassword(body, user);

    return new ApiResponse(result);
  }
}

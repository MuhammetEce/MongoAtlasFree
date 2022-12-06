import { ApiResponse } from '../base/helpers/APICallMapper';
import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDTO, LoginDTO } from './dto/auth.dto';
import { Tokens } from './interfaces/Credentials';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    description: `This api register users to the app.<br>`,
  })
  @Post('register')
  async register(@Body() body: RegisterDTO): Promise<ApiResponse<Tokens>> {
    const result = await this.authService.register(body);

    return new ApiResponse(result);
  }

  @ApiOperation({
    description: `This api for login the app.<br>`,
  })
  @Post('login')
  async login(@Body() body: LoginDTO): Promise<ApiResponse<Tokens>> {
    const result = await this.authService.login(body);

    return new ApiResponse(result);
  }
}

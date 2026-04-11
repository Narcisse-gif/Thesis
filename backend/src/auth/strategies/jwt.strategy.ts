import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') || 'super-secret-stagelink-key-2026',
    });
  }

  async validate(payload: any) {
    // Cette méthode attache l'utilisateur (userId, email, role) à l'objet request de Nest (req.user)
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}
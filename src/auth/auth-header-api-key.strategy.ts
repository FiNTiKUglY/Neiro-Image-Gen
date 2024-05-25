import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import Strategy from 'passport-headerapikey';
import { Logger } from '@nestjs/common';

@Injectable()
export class HeaderApiKeyStrategy extends PassportStrategy(Strategy, 'api-key') {
    private readonly logger = new Logger(HeaderApiKeyStrategy.name);
    constructor(
        private readonly configService: ConfigService
    ) {
        super({ header: 'X-API-KEY', prefix: '' },
        true,
        async (apiKey, done) => {
            return this.validate(apiKey, done);
        });
    }

    public validate = (apiKey: string, done: (error: Error, data) => {}) => {
        if (this.configService.get<string>('API_KEY') === apiKey) {
            done(null, true);
        }
        done(new UnauthorizedException(), null);
    }
}
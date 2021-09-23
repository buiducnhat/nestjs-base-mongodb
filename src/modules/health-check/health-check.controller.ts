import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { HealthCheckService, HealthCheck, MongooseHealthIndicator } from '@nestjs/terminus';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(private health: HealthCheckService, private mongodb: MongooseHealthIndicator) {}

  @Get()
  @ApiOperation({ summary: 'Health Check', description: 'Check status of running server' })
  @HealthCheck()
  check() {
    return this.health.check([() => this.mongodb.pingCheck('database')]);
  }
}

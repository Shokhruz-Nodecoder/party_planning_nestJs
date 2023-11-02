import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PartyService } from './party.service';
import { CreatePartyDto } from './dto/create-party.dto';
import { UpdatePartyDto } from './dto/update-party.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('Party')
@ApiBearerAuth()
@Controller('party')
export class PartyController {
  constructor(private readonly partyService: PartyService) {}

  @ApiOperation({ summary: 'This route for creating a new party' })
  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createPartyDto: CreatePartyDto, @Req() req) {
    return this.partyService.create(createPartyDto, +req.user.id);
  }

  @ApiOperation({ summary: 'This route for getting all parties' })
  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Req() req) {
    return this.partyService.findAll(+req.user.id);
  }

  @ApiOperation({ summary: 'This route for getting only one party with id' })
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.partyService.findOne(+id);
  }

  @ApiOperation({ summary: 'This route for updating a party' })
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updatePartyDto: UpdatePartyDto) {
    return this.partyService.update(+id, updatePartyDto);
  }

  @ApiOperation({ summary: "This route for deleting a party with it's id" })
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.partyService.remove(+id);
  }
}

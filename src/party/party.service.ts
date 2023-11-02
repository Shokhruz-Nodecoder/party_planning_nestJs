import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePartyDto } from './dto/create-party.dto';
import { UpdatePartyDto } from './dto/update-party.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Party } from './entities/party.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PartyService {
  constructor(
    @InjectRepository(Party)
    private readonly partyRepository: Repository<Party>,
  ) {}

  async create(createPartyDto: CreatePartyDto, id : number) {
    const isExist = await this.partyRepository.findBy({
      user: { id },
      title: createPartyDto.title,
    });

    if (isExist.length)
      throw new BadRequestException('This party already exists');

    const newParty = {
      title: createPartyDto.title,
      location: createPartyDto.location,
      time: createPartyDto.time,
      user: { id },
    };

    return await this.partyRepository.save(newParty);
  }

  findAll() {
    return `This action returns all party`;
  }

  findOne(id: number) {
    return `This action returns a #${id} party`;
  }

  update(id: number, updatePartyDto: UpdatePartyDto) {
    return `This action updates a #${id} party`;
  }

  remove(id: number) {
    return `This action removes a #${id} party`;
  }
}

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  async create(createPartyDto: CreatePartyDto, id: number) {
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

  async findAll(id: number) {
    return this.partyRepository.find({ where: { user: { id } } });
  }

  async findOne(id: number) {
    const party = await this.partyRepository.findOne({
      where: { id },
      relations: {
        user: true,
      },
    });

    if (!party) throw new NotFoundException('Party not found');

    return party;
  }

  async update(id: number, updatePartyDto: UpdatePartyDto) {
    const party = await this.partyRepository.findOne({
      where: { id },
    });

    if (!party) throw new NotFoundException('Party not found!');

    return await this.partyRepository.update(id, updatePartyDto);
  }

  async remove(id: number) {
    const party = await this.partyRepository.findOne({
      where: { id },
    });

    if (!party) throw new NotFoundException('Party not found!');

    return await this.partyRepository.delete(id);
  }
}

import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { CreateLocationDto } from "./dto/create-location.dto";
import { UpdateLocationDto } from "./dto/update-location.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Location } from "./entities/location.entity";
import { validate as IsUUID } from "uuid";

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>
  ) {}
  async create(createLocationDto: CreateLocationDto) {
    try {
      const location = this.locationRepository.create(createLocationDto);
      await this.locationRepository.save(location);
      return location;
    } catch (error) {
      this.handleErrors(error);
    }
  }
  async findOne(term: string) {
    let location: Location | null;

    if (IsUUID(term)) {
      location = await this.locationRepository.findOneBy({ id: term });
    } else {
      const queryBuilder = this.locationRepository.createQueryBuilder();
      location = await queryBuilder
        .where(`UPPER(name) =:name or UPPER(address) =:address`, {
          name: term.toUpperCase(),
          address: term.toUpperCase(),
        })
        .getOne();
    }
    if (!location) {
      throw new NotFoundException(`Location with ${term} not found`);
    }
    return location;
  }
  findAll() {
    //añadir pagination
    return this.locationRepository.find();
  }

  async update(id: string, updateLocationDto: UpdateLocationDto) {
    const updatedLocation = await this.locationRepository.preload({
      id,
      ...updateLocationDto,
    });

    if (!updatedLocation) {
      throw new BadRequestException("Location is undefined");
    }
    return await this.locationRepository.save(updatedLocation);
  }

  async remove(id: string) {
    const { affected } = await this.locationRepository.delete({ id });
    if (affected === 0)
      throw new BadRequestException(
        `Not found location whit ${id} in the database`
      );

    return;
  }

  private handleErrors(error: any) {
    if (error.code === "23505") {
      throw new BadRequestException(error.detail);
    }
    throw new InternalServerErrorException("Unexpected error check the logs");
  }
}

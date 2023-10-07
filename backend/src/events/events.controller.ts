import { Controller, Body, Headers, Post } from "@nestjs/common";
import { EventsService } from "./events.service";
import { eventDataDTO, eventHoverDTO, eventCreationDTO } from "src/dto/event.dto";

@Controller("events")
export class EventsController{
  constructor(private readonly EventsService: EventsService){}

  // @Get()
  // async getAllEvents(@Headers("Authorization") ): Promise<eventDataDTO[]>{

  // }

  @Post()
  async createEvent(@Body() eventCreationDTO: eventCreationDTO, @Headers("Authorization") token: string): Promise<any>{
    return (await this.EventsService.createEvent(eventCreationDTO, token));
  }


  //GetMy
  //GetSuggested
  //GetToday
  //GetThisWeek
  //GetThisMonth
  //GetById
}
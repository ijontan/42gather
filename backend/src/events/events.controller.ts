import { Controller, Body, Get, Headers, Post, Param } from "@nestjs/common";
import { EventsService } from "./events.service";
import { eventDataDTO, eventHoverDTO, eventCreationDTO } from "src/dto/event.dto";

@Controller("events")
export class EventsController{
  constructor(private readonly EventsService: EventsService){}

  @Get("my")
  async getMyEvents(@Headers("Authorization") token: string): Promise<any>{
    return (await this.EventsService.getMyEvents(token));
  }

  @Get("suggested")
  async getSuggestedEvents(@Headers("Authorization") token: string): Promise<any>{
    return (await this.EventsService.getSuggestedEvents(token));
  }

  @Get("today")
  async getTodayEvents(@Headers("Authorization") token: string): Promise<any>{
    console.log("today event")
    return (await this.EventsService.getTodayEvents(token));
  }

  @Get("week")
  async getWeekEvents(@Headers("Authorization") token: string): Promise<any>{
    console.log("week event")
    return (await this.EventsService.getWeekEvents(token));
  }

  @Get("month")
  async getMonthEvents(@Headers("Authorization") token: string): Promise<any>{
    console.log("month event")
    return (await this.EventsService.getMonthEvents(token));
  }

  @Get("id/:id")
  async getEventByID(@Headers("Authorization") token: string, @Param("id") id: string): Promise<any>{
    return (await this.EventsService.getEventByID(token, id));
  }

  @Post("create")
  async createEvent(@Body() eventCreationDTO: eventCreationDTO, @Headers("Authorization") token: string): Promise<number>{
    console.log("Create event");
    console.log(eventCreationDTO);
    return (await this.EventsService.createEvent(eventCreationDTO, token));
  }

  @Post("join")
  async joinEvent(@Body() body: any, @Headers("Authorization") token: string): Promise<any>{
    return (await this.EventsService.joinEvent(body.eventID, token));
  }

  @Get("reset")
  async resetEvents(): Promise<void>{
    return (await this.EventsService.resetEvents());
  }
}
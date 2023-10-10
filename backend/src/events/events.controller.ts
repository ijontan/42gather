import { Controller, Body, Get, Headers, Post, Param, UseGuards } from "@nestjs/common";
import { EventsService } from "./events.service";
import { eventDataDTO, eventHoverDTO, eventCreationDTO } from "src/dto/event.dto";
import { AuthGuard } from "src/guard/auth.guard";

@Controller("events")
export class EventsController{
  constructor(private readonly EventsService: EventsService){}

  @Get("my")
  @UseGuards(AuthGuard)
  async getMyEvents(@Headers("Authorization") token: string): Promise<any>{
    return (await this.EventsService.getMyEvents(token));
  }

  @Get("suggested")
  @UseGuards(AuthGuard)
  async getSuggestedEvents(@Headers("Authorization") token: string): Promise<any>{
    return (await this.EventsService.getSuggestedEvents(token));
  }

  @Get("today")
  @UseGuards(AuthGuard)
  async getTodayEvents(@Headers("Authorization") token: string): Promise<any>{
    console.log("today event")
    return (await this.EventsService.getTodayEvents(token));
  }

  @Get("week")
  @UseGuards(AuthGuard)
  async getWeekEvents(@Headers("Authorization") token: string): Promise<any>{
    console.log("week event")
    return (await this.EventsService.getWeekEvents(token));
  }

  @Get("month")
  @UseGuards(AuthGuard)
  async getMonthEvents(@Headers("Authorization") token: string): Promise<any>{
    console.log("month event")
    return (await this.EventsService.getMonthEvents(token));
  }

  @Get("id/:id")
  @UseGuards(AuthGuard)
  async getEventByID(@Headers("Authorization") token: string, @Param("id") id: string): Promise<any>{
    return (await this.EventsService.getEventByID(token, id));
  }

  @Post("create")
  @UseGuards(AuthGuard)
  async createEvent(@Body() eventCreationDTO: eventCreationDTO, @Headers("Authorization") token: string): Promise<number>{
    console.log("Create event");
    console.log(eventCreationDTO);
    return (await this.EventsService.createEvent(eventCreationDTO, token));
  }

  @Post("join")
  @UseGuards(AuthGuard)
  async joinEvent(@Body() body: any, @Headers("Authorization") token: string): Promise<any>{
    return (await this.EventsService.joinEvent(body.eventID, token));
  }

  @Get("reset")
  async resetEvents(): Promise<void>{
    return (await this.EventsService.resetEvents());
  }
}
import { Controller, Body, Get, Headers, Post, Param, Put, UseGuards } from "@nestjs/common";
import { EventsService } from "./events.service";
import { eventCreationDTO } from "src/dto/event.dto";
import { AuthGuard } from "src/guard/auth.guard";

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

  @Get("past")
  @UseGuards(AuthGuard)
  async getPastEvents(@Headers("Authorization") token: string): Promise<any>{
    return (await this.EventsService.getPastEvents(token));
  }

  @Get("id/:id")
  @UseGuards(AuthGuard)
  async getEventByID(@Headers("Authorization") token: string, @Param("id") id: string): Promise<any>{
    return (await this.EventsService.getEventByID(token, id));
  }

  @Get("tag/:tag")
  @UseGuards(AuthGuard)
  async getEventsByTag(@Param("tag") tag: string): Promise<any>{
    return (await this.EventsService.getEventsByTag(tag));
  }

  @Post("create")
  @UseGuards(AuthGuard)
  async createEvent(@Body() eventCreationDTO: eventCreationDTO, @Headers("Authorization") token: string): Promise<number>{
    return (await this.EventsService.createEvent(eventCreationDTO, token));
  }

  @Post("join")
  @UseGuards(AuthGuard)
  async joinEvent(@Body() body: any, @Headers("Authorization") token: string): Promise<any>{
    return (await this.EventsService.joinEvent(body.eventID, token));
  }

  @Put("id/:id")
  @UseGuards(AuthGuard)
  async editEvent(@Body() eventCreationDTO: eventCreationDTO, @Headers("Authorization") token: string, @Param("id") id: string): Promise<any>{
    await this.EventsService.editEvent(eventCreationDTO, token, id);
  }

  @Post("announce/:id")
  @UseGuards(AuthGuard)
  async announce(@Body() body:any, @Headers("Authorization") token: string, @Param("id") id: string): Promise<any>{
    return (await this.EventsService.announce(body, token, id));
  }

  @Post("comment/:id")
  @UseGuards(AuthGuard)
  async comment(@Body() body:any, @Headers("Authorization") token: string, @Param("id") id: string): Promise<any>{
    return (await this.EventsService.comment(body, token, id));
  }

  @Get("reset")
  async resetEvents(): Promise<void>{
    return (await this.EventsService.resetEvents());
  }
}
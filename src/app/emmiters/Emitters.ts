import { EventEmitter } from "@angular/core";
import { RequestParams } from "../model/requestParams";

export class Emitters{
    static authEmitter = new EventEmitter<boolean>();
    static parametersEmitter = new EventEmitter<RequestParams>();
}
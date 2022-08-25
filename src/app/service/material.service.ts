import { ElementRef } from "@angular/core";

  declare let M:any;
  
  export class MaterialsService{
    static toast(message: string){
      alert(message); 
    }
    static initButton(ref: ElementRef){
      M.FloatingActionButton.init(ref.nativeElement)
    }
    static updateTextInputs(){
      M.updateTextFields()
    }
  }


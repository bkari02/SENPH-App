//constructor() { }
import { Component, OnInit } from '@angular/core';
import { Phenomenon }    from '../phenomenon';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'senph-form-template',
  templateUrl: './form-template.component.html',
  styleUrls: ['./form-template.component.scss']
})
export class FormTemplateComponent implements OnInit {

  constructor(
    private route:ActivatedRoute,
    private api:ApiService
  ) { }
    // iri;
  languageTags = ['en', 'de',
            'es', 'it'];

  model = new Phenomenon({label:"", lang: this.languageTags[0]}, {comment: "", lang: this.languageTags[0]}, "" ,"");

  submitted = false;
  ngOnInit(){
    // this.route.params.subscribe(res => {
    //   this.iri = res.iri;
    // });
  }
  onSubmit() { 
    // console.log(this.route);
    // console.log(this.model);
    this.api.updatePhenomenon(this.model).subscribe(res => {console.log(res)});
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }
}
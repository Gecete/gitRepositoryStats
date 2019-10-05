import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'Github Programming Language Statistics by User';
  repos = [];
  chargeDone: boolean=false;
  page : string;
  urlUser : string;
  avatar: string = null;
  user :string ="nasa";
  totalPages : string = "100";
constructor(private apiService: ApiService, private spinner: NgxSpinnerService) {


}
recursiveCallback (page){
  this.apiService.get('users/'+this.user+'/repos?per_page=100&page='+page).subscribe(res => {
    
  
  let headLinks=res.headers.toJSON()
  // console.log(headLink.link)
  if(page>1 && page<=this.totalPages){
    this.repos=this.repos.concat(res.json());
    if(page ==this.totalPages){
      this.chargeDone=true;
      this.spinner.hide();
    }
    page++;
    this.recursiveCallback(page);
   
  }else{
    if(page==1){
      this.repos=res.json();
    }
    if(headLinks.link!=undefined){
      this.totalPages= this.getTotal(this.getLinks(headLinks.link));
      page++;
    }else{
      this.spinner.hide();
      this.chargeDone=true;
      this.totalPages="0";
    }
    if(page<=this.totalPages){
      this.recursiveCallback(page);
    }}}, error => {
      console.log(error); // for development only.
  });

}

getUserImg(){
  this.chargeDone=false;
  this.apiService.get('users/'+this.user).subscribe(res => {
    let response=res.json();
    this.avatar=response.avatar_url;
    this.urlUser=response.html_url;
  }, error => {
      this.avatar=null;
      this.repos=[];
      console.log(error); // for development only.
  });
}

getTotal(links){
  let total = null
  links.forEach(link => {
if(link.hasOwnProperty('last')){
  total= link.last[link.last.length-1];
} 
 });
 return total;
}

getLinks(headLinks){
  let allLinks = [];
  headLinks.forEach(element => {
        allLinks.push(this.parse_link_header(element))
});
return allLinks;
}



parse_link_header(header) {
  if (header.length == 0) {
    throw new Error("input must not be of zero length");
  }

  // Split parts by comma
  var parts = header.split(',');
  var links = {};
  // Parse each part into a named link
  parts.forEach(p => {
    var section = p.split(';');
    if (section.length != 2) {
      throw new Error("section could not be split on ';'");
    }
    var url = section[0].replace(/<(.*)>/, '$1').trim();
    var name = section[1].replace(/rel="(.*)"/, '$1').trim();
    links[name] = url;
  });

  return links;
}






 ngOnInit() {
  this.spinner.show();
  this.chargeDone=false;
  this.avatar=null;
  this.repos=[];
  this.getUserImg()
  this.recursiveCallback("1");
  
      }




}
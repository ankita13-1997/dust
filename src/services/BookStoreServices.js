import AxiosService from "./AxiosService";


const service = new AxiosService();

export default class BookStoreServices {


displayBook(){
  return service.Get("book/getAllBooks");
}

getCount(){
  return service.Get("book/count");
}

lowToHigh(){
  return service.Get("/book/getBooksLowToHigh");
} 

HighToLow(){
  return service.Get("/book/getBooksHighToLow");
} 

NewestArrival(){
  return service.Get("/book/getbooksByPublishingYear");
}

}
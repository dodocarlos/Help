package main

import (
	"encoding/json"
	"log"
	"net/http"
)

type Teste struct{
	ID int;
	Usuario string;
    Senha string;
}

func handleBaseLink(w http.ResponseWriter, r *http.Request){
	teste := Teste{1, "carlos", "123"};
	
	obj, _ := json.Marshal(teste);

	w.Write(obj);
}

func main(){
	http.HandleFunc("/", handleBaseLink);

	log.Fatal(http.ListenAndServe(":3000", nil));
}
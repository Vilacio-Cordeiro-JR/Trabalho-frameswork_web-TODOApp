import { Component, signal, OnInit } from '@angular/core';
import { Tarefa } from "./tarefa";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('TODOapp');

  arrayDeTarefas = signal<Tarefa[]>([]);
  apiURL: string;
  isServer = typeof window === 'undefined';

  constructor(private http: HttpClient) {
    // Detectar URL da API baseado no ambiente
    const isDevelopment = typeof window !== 'undefined' && 
      (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
    
    if (isDevelopment) {
      this.apiURL = 'http://localhost:3000/api';
    } else if (typeof window !== 'undefined') {
      // Em produção, usar a mesma origem (Vercel)
      this.apiURL = `${window.location.protocol}//${window.location.host}/api`;
    } else {
      // SSR - não fazer requisições aqui
      this.apiURL = '/api';
    }
  }

  ngOnInit() {
    // Só fazer requisições após inicializar no browser
    if (!this.isServer) {
      this.READ_tarefas();
    }
  }

  CREATE_tarefa(descricaoNovaTarefa: string) {
    var novaTarefa = new Tarefa(descricaoNovaTarefa, false);
    this.http.post<Tarefa>(`${this.apiURL}/tarefas/post`, novaTarefa).subscribe(
      resultado => this.READ_tarefas());
  }

  READ_tarefas() {
    this.http.get<Tarefa[]>(`${this.apiURL}/tarefas/getAll`).subscribe(
      resultado => this.arrayDeTarefas.set(resultado));
  }
  DELETE_tarefa(tarefa: Tarefa) {
    var indice = this.arrayDeTarefas().indexOf(tarefa);
    var id = this.arrayDeTarefas()[indice]._id;
    this.http.delete<Tarefa>(`${this.apiURL}/tarefas/delete?id=${id}`).subscribe(
      resultado => { console.log(resultado); this.READ_tarefas(); });

  }

  UPDATE_tarefa(tarefaAserModificada: Tarefa) {
    var indice = this.arrayDeTarefas().indexOf(tarefaAserModificada);
    var id = this.arrayDeTarefas()[indice]._id;
    this.http.patch<Tarefa>(`${this.apiURL}/tarefas/update?id=${id}`,
      tarefaAserModificada).subscribe(
        resultado => { console.log(resultado); this.READ_tarefas(); });
  }


}

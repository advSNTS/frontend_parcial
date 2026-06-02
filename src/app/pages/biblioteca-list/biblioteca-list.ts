import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Biblioteca } from '../../models/biblioteca';
import { BibliotecaService } from '../../services/biblioteca.service';

@Component({
  selector: 'app-biblioteca-list',
  imports: [FormsModule],
  templateUrl: './biblioteca-list.html'
})
export class BibliotecaList {
  bibliotecas = signal<Biblioteca[]>([]);
  form: Biblioteca = { nombre: '', direccion: '', telefono: '', responsable: '' };
  editId: number | null = null;

  constructor(private svc: BibliotecaService) {
    this.cargar();
  }

  cargar() {
    this.svc.getAll().subscribe(data => this.bibliotecas.set(data));
  }

  guardar() {
    if (this.editId) {
      this.svc.update(this.editId, this.form).subscribe(() => {
        this.cancelar();
        this.cargar();
      });
    } else {
      this.svc.create(this.form).subscribe(() => {
        this.cancelar();
        this.cargar();
      });
    }
  }

  editar(b: Biblioteca) {
    this.editId = b.id!;
    this.form = { nombre: b.nombre, direccion: b.direccion, telefono: b.telefono, responsable: b.responsable };
  }

  eliminar(id: number) {
    this.svc.delete(id).subscribe(() => this.cargar());
  }

  cancelar() {
    this.editId = null;
    this.form = { nombre: '', direccion: '', telefono: '', responsable: '' };
  }
}

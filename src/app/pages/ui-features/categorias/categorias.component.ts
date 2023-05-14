import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalDataSource } from 'ng2-smart-table';
import { NbToastrService } from '@nebular/theme';

interface Categoria {
  id: number;
  nombre: string;
  descripcion: string;
}

@Component({
  selector: 'ngx-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent  implements OnInit{

  source: LocalDataSource;
  categoryForm: FormGroup;
  showAddCategoryModal: boolean = false;
  settings = {
    actions: {
      delete: {
        title: 'Eliminar',
        type: 'html',
        valuePrepareFunction: (cell, row) => '<i class="nb-trash"></i>'
      },
      edit: {
        title: 'Editar',
        type: 'html',
        valuePrepareFunction: (cell, row) => '<i class="nb-edit"></i>'
      },
      add: {
        title: 'Crear',
        type: 'html',
        valuePrepareFunction: (cell, row) => '<i class="nb-plus"></i>'
      },
      position: 'right'
    },
    columns: {
      id: {
        title: 'ID',
        type: 'string'
      },
      nombre: {
        title: 'Nombre',
        type: 'string'
      },
      descripcion: {
        title: 'Descripción',
        type: 'string'
      }
    }
  };

  constructor(private fb: FormBuilder, private toastrService: NbToastrService) { }

  ngOnInit(): void {
    this.source = new LocalDataSource([
      {
        id: '1',
        nombre: 'Categoria 1',
        descripcion: 'Descripción de la categoría 1'
      },
      {
        id: '2',
        nombre: 'Categoria 2',
        descripcion: 'Descripción de la categoría 2'
      }
    ]);

    this.categoryForm = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  onCustomAction(event: any): void {
    switch (event.action) {
      case 'edit':
        this.onEdit(event);
        break;
      case 'delete':
        this.onDelete(event);
        break;
      case 'add':
        this.onAdd();
        break;
    }
  }

  onAdd(): void {
    this.categoryForm.reset();
    this.categoryForm.get('id').setValue(this.generateId());
    this.showAddCategoryModal = true;
  }

  onEdit(event: any): void {
    const category = event.data;
    this.categoryForm.setValue({
      id: category.id,
      nombre: category.nombre,
      descripcion: category.descripcion
    });
    this.showAddCategoryModal = true;
  }

  onDelete(event: any): void {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
      this.source.remove(event.data);
      this.toastrService.success('Eliminación exitosa', 'La categoría ha sido eliminada correctamente');
    }
  }

  onSubmit(): void {
    const category = this.categoryForm.value;
    if (category.id) {
      this.source.update(category, category);
      this.toastrService.success('Actualización exitosa', 'La categoría ha sido actualizada correctamente');
    } else {
      category.id = this.generateId();
      this.source.add(category);
      this.toastrService.success('Creación exitosa', 'La categoría ha sido creada correctamente');
    }
    this.hideAddCategoryModal();
  }

  generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }



  hideAddCategoryModal(): void {
    document.getElementById('categoryForm').style.display = 'none';
  }
}

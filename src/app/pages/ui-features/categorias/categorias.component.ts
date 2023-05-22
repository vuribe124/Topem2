import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '../../../@core/data/smart-table';
import { MaestrosService } from '../../../services/maestros.service';
import Swal from 'sweetalert2';

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
export class CategoriasComponent {

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: 'Id',
        type: 'number',
      },
      name: {
        title: 'Nombre',
        type: 'string',
      },
      description: {
        title: 'Descripción',
        type: 'string',
      },
      status: {
        title: 'Habilitado',
        type: 'string',
        // filter: {
        //   type: 'checkbox',
        //   config: {
        //     true: true,
        //     false: false,
        //   },
        // },
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private service: SmartTableData,
    private maestrosSV: MaestrosService
  ) {
    // const data = this.service.getData();
    this.maestrosSV.categories().subscribe((response: any) => {
      if (response.success) {
        this.source.load(response.data);
      }
    })
  }

  onDeleteConfirm(event): void {
    let config = {
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }

    Swal.fire(config).then((result: any) => {
      if (result.isConfirmed) {
        event.confirm.resolve();
        Swal.fire("Deleted!", "Your imaginary file has been archived.", "success");
      } else {
        event.confirm.reject();
        Swal.fire("Cancelled", "Your imaginary file is safe :)", "error");
      }
    }
    )
  }

  onConfirmSave(event) {
    console.log('event', event)
  }
}

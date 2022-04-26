import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {

  productos: any[] = [];
  public page!: number;
  pages: number = 1;

  agregarForm: FormGroup;

  @ViewChild('cerrarForm') cerrarForm: any;

  constructor
  (
    public ps: ProductosService,
    public formBuilder: FormBuilder,
  )
  {
    this.agregarForm = formBuilder.group({
      idReferencia: [
        '',
        Validators.compose([
          Validators.maxLength(20),
          Validators.required,
        ]),
      ],

      referencia: [
        '',
        Validators.compose([
          Validators.maxLength(50),
          Validators.required,
        ]),
      ],

      descripcion: [
        '',
        Validators.compose([
          Validators.maxLength(300),
          Validators.required,
        ]),
      ],

      proveedor: [
        '',
        Validators.compose([
          Validators.maxLength(50),
          Validators.required,
        ]),
      ],

      color: [
        '',
        Validators.compose([
          Validators.required,
        ]),
      ],

      precio: [
        '',
        Validators.compose([
          Validators.required,
        ]),
      ],

      estado: [
        '',
        Validators.compose([
          Validators.required,
        ]),
      ],
    });
  }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos() {
    this.ps.obtenerProductos().subscribe(productos => {
      this.productos = productos;
      console.log(this.productos);
    }, error => {
      console.log(error);
    })
  }

  crearProducto(){
    const producto = {
      idReferencia: this.agregarForm.value.idReferencia,
      referencia: this.agregarForm.value.referencia,
      descripcion: this.agregarForm.value.descripcion,
      color: this.agregarForm.value.color,
      proveedor: this.agregarForm.value.proveedor,
      precio: this.agregarForm.value.precio,
      estado: this.agregarForm.value.estado
    }
    console.log(producto);
    this.ps.crearProducto(producto).subscribe(resp => {
      console.log('producto creado ', resp);
      // Cerrar modal
      this.obtenerProductos();
      this.cerrarForm.nativeElement.click();
    })
  }

  eliminarProducto(id: number){
    console.log(id);
    if(confirm("Esta de seguro de eliminar el empleado?")) {
      this.ps.eliminarProducto(id).subscribe(resp => {
        console.log(resp);
        this.obtenerProductos();
      });
    }
    
  }

}

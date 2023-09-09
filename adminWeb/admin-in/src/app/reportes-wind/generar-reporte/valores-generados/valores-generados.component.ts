import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ClienteWAService } from 'src/app/services/cliente-wa.service';
import pdfMake from 'pdfmake/build/pdfMake';
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs =  pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-valores-generados',
  templateUrl: './valores-generados.component.html',
  styleUrls: ['./valores-generados.component.css']
})
export class ValoresGeneradosComponent implements OnInit, AfterViewInit {

  formulario_fecha!: FormGroup;
  formulario_costos!: FormGroup;
  pedidos:any=[];

   columnas: string[] = ['id','client_dni','client_name','date_request', 'service_name', 'start_date', 'start_time','status', 'total'];

   columnasPdf: Array<string> = ['Id', 'Cédula', 'Nombre del cliente', 'Fecha de solicitud', 'Servicio', 'Fecha de inicio', 'Hora de inicio', 'Estado', 'Total']

   dataSource: MatTableDataSource<any> = new MatTableDataSource<any>(this.pedidos);

   @ViewChild(MatPaginator)
  paginator!: MatPaginator;

   display = 'none';

     filtros: Filtro[] = [
    {value: 'administrador', viewValue: 'Usuarios administrador'},
    {value: 'operativo', viewValue: 'Usuarios operativo'},
    {value: 'todos', viewValue: 'Todos los usuarios'},
  ];
  selectedValue: string | undefined;


  constructor(
    private clienteWaService: ClienteWAService
  ) { }

  ngOnInit(): void {
    // let initializer
    this.obtenerPedidos();

    this.formulario_costos =  new FormGroup({
      costo_desde: new FormControl(0),
      costo_hasta: new FormControl(0)
    })

    this.formulario_fecha =  new FormGroup({
      fecha_inicio: new FormControl(''),
      fecha_fin: new FormControl('')
    })
    
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  obtenerPedidos(){
    this.pedidos = []
    this.clienteWaService.obtenerTodoPedidos()
    .subscribe({
      next: (data) => {
        console.log(data);
        this.pedidos =  this.pedidos.concat(data);
        this.dataSource = new MatTableDataSource<any>(this.pedidos);
        this.dataSource.paginator = this.paginator
        

      }
    })  

  }

  filtroPorfecha(){

    let fechaInicio: Date = new Date(this.formulario_fecha.value.fecha_inicio);
    if(this.formulario_fecha.value.fecha_inicio == ''){
      fechaInicio = new Date('1900-08-30')
    }
    let fechaFin: Date = new Date(this.formulario_fecha.value.fecha_fin); 
    if(this.formulario_fecha.value.fecha_fin == ''){
      fechaFin = new Date();
    }
    this.pedidos =  this.pedidos.filter(
      (item: { start_date: any; }) => {
        const fechaItem = new Date(item.start_date);
      return (
        (!fechaInicio || fechaItem >= fechaInicio) &&
        (!fechaFin || fechaItem <= fechaFin)
      );

      })

      this.dataSource = new MatTableDataSource<any>(this.pedidos);
      this.dataSource.paginator = this.paginator
  }

  filtroPorCosto(){

    let costoInicio: any = this.formulario_costos.value.costo_desde;
    if(this.formulario_costos.value.costo_desde < 0){
      costoInicio = 0
    }
    let costoFin: any = this.formulario_costos.value.costo_hasta;
    if(this.formulario_costos.value.costo_hasta == 0){
      costoFin = 10000000000;
    }
    this.pedidos =  this.pedidos.filter(
      (item: { total: any; }) => {
      return (
        (!costoInicio || item.total >= costoInicio) &&
        (!costoFin || item.total <= costoFin)
      );

      })

      this.dataSource = new MatTableDataSource<any>(this.pedidos);
      this.dataSource.paginator = this.paginator


  }

  crearPdf(){

    const pdfDefinition: any = {
      header: [
        {
          text: 'Reportes Seproamerica',
          alignment: 'left',
        },
        {
          text: new Date(),
          alignment: 'right',
        },
      ],
      content: [
        { text: 'Valores generados Seproamérica', style: 'header' },
        {
          style: 'tableExample',
          table: {
            body: [
              this.columnasPdf,
            ]
          }
        },
        
      ],
      styles: {
        header: {
          fontSize: 22,
          bold: true
        },
        tableExample: {
          margin: [0, 5, 0, 15],
          alignment: 'center'
        },
      },
      pageOrientation: 'landscape',
    }
    // console.log(pdfDefinition.content[1].table.body)
    for(let pedido of this.pedidos){
      //['id','client_dni','client_name','date_request', 'service_name', 'start_date', 'start_time','status', 'total'];
      let elementoBody = [pedido.id, pedido.client_dni, pedido.client_first_name + " " + pedido.client_last_name, pedido.date_request.split('T')[0], pedido.service_name, pedido.start_date, pedido.start_time, pedido.status, pedido.total];
      pdfDefinition.content[1].table.body.push(elementoBody)
      console.log(elementoBody);
    }
    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.open();
  }

}

interface Filtro {
  value: string;
  viewValue: string;
}



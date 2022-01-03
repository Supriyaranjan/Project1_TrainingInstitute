import { LightningElement } from 'lwc';
import TRAININGINSTITUTELOGO from '@salesforce/resourceUrl/traininginstitutelogo'

export default class Appheader extends LightningElement {

    logo = TRAININGINSTITUTELOGO;   
    companyName = "Phoenix Trainings and Solutions";
}
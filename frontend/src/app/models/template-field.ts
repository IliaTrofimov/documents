import { RestrictionTypes, InputType } from "./template-enums";

export class TemplateField{
    public Id: number = -1;
    public Name: string = "";
    public Order: number = 0;
    public TemplateId: number = -1;
    public Restriction: string = "";
    public RestrictionType: RestrictionTypes = RestrictionTypes.None;
    public Required: boolean = false;
    public DataType: InputType = InputType.Text;
    public TemplateTableId?: number;

    constructor(name: string, order: number){
        this.Name = name;
        this.Order = order;
    }
}
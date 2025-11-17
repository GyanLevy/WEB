import {row,col} from "../controller/utils.js"
class Block{
    constructor(type,value){
        this.type = type
        this.value = value
    }
    toHTML(){
        throw('must be implemented')
    }
}
export class TitleBlock extends Block{
    constructor(value){
        super('title',value)
    }
    toHTML(){
        return row(col(`<h1>${this.value}</h1>`))
    }
}
export class TextBlock extends Block{
    constructor(value){
        super('text',value)
    }
    toHTML(){
        return row(col(this.value))
    }
}
export class ColumnsBlock extends Block{
    constructor(value){
        super('columns',value)
    }
    toHTML(){
        return row(this.value.map(d=> col(d)).join(""))
    }
}
export class ImageBlock extends Block{
    constructor(value){
        super('image',value)
    }
    toHTML(){
        return row(col(`<img src="${this.value}"/>`))
    }
}

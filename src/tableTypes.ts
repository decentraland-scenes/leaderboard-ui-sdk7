import { Color4 } from '@dcl/sdk/math'
import { TextAlignType,PositionUnit,UiFontType, Position, UiBackgroundProps } from '@dcl/sdk/react-ecs'


export type CellType ="text"|"image"|"avatar"

export type TableCellStyleSheet = //EntityPropTypes & UiLabelProps{
{
  textAlign?:TextAlignType
  width?:PositionUnit
  height?:PositionUnit
  innerWidth?:PositionUnit
  innerHeight?:PositionUnit
  fontSize?:number
  font?:UiFontType
  fontColor?:Color4
  margin?:Partial<Position>
  uiBackground?:UiBackgroundProps
}
export class TableCell{
  type:CellType
  value:string
  stylesheet?:TableCellStyleSheet
  constructor(type:CellType,value:string,stylesheet?:TableCellStyleSheet){
    this.type = type
    this.value = value
    this.stylesheet = stylesheet
  }
}

export class TableRow{
  cells:TableCell[] = []
  stylesheet?:TableCellStyleSheet
  constructor(stylesheet?:TableCellStyleSheet){
    this.stylesheet = stylesheet
  }
}
export class Table{
  visible:boolean = true
  header:TableRow
  rows:TableRow[] = []

  constructor(header:TableRow){
    this.header = header
  }
}


export function isPercent(val:PositionUnit){
  if(typeof val === 'string'){
    return val.indexOf("%") > 0
  }
  return false
}
export function getNumber(val:PositionUnit){
  if(typeof val === 'string'){
    return parseFloat(val.replace("%","").replace("px",""))
  }
  return val
}
export function adjustNonSetWidthsEvenDist(cells:TableCell[]){
  let definedWidth = 0
  let hasDef = 0

  for(const c of cells){
    if(c.stylesheet?.width && isPercent(c.stylesheet?.width)){
      definedWidth += getNumber(c.stylesheet?.width)
      hasDef++
    }
  }

  const adjustNum = cells.length - hasDef
  const adjustNumVal = (1/adjustNum)*100

  //console.log("adjustNonSetWidthsEvenDist","definedWidth",definedWidth,"hasDef",hasDef,"adjustNum",adjustNum,adjustNumVal)

  for(const c of cells){
    if(c.stylesheet && !c.stylesheet?.width ){
      c.stylesheet.width = `${adjustNumVal}%`
    }
  }
}



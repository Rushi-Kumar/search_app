import React from 'react'
import PropTypes from 'prop-types'
// import data from "./dummy_result.json"
import "./Result.css"

const Tag = (props)=>{
  return <div className="Tag"
          style={{backgroundColor:props.bgColor,color:props.textColor,marginLeft:"3px",marginRight:"3px"}}
         >
          {props.children}
         </div>
}

class Result extends React.Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }

  render () {
    let {data}  = this.props
    console.log(data)
    return (
      <div className ="card">
        <div>
          <img src ={data.recipe.image} alt="recipe image"/>
        </div>
        <div style = {{marginLeft:"30px",width:"100%"}}>
          <h3 className="resultLabel">{data.recipe.label}</h3>
          <div style={{display:"flex",alignItems:"baseline"}}>
            <h4 style={{marginRight:"5px",marginTop:"0px",marginBottom:"15px"}}>Diet Facts: </h4>
            {data.recipe.dietLabels.map(f=> <Tag bgColor="blue" textColor="white">{f}</Tag>)}
          </div>
          <div style={{display:"flex",alignItems:"baseline"}}>
            <h4 style={{marginRight:"5px",marginTop:"0px",marginBottom:"15px"}}>Health Facts: </h4>
            {data.recipe.healthLabels.map(f=> <Tag bgColor="blue" textColor="white">{f}</Tag>)}
          </div>
          <div style={{display:"flex",alignItems:"baseline"}}>
            <h4 style={{marginRight:"5px",marginTop:"0px",marginBottom:"15px"}}>Cautions: </h4>
            {data.recipe.cautions.length ==0 ? "NA" : <>{data.recipe.cautions.map(f=> <Tag bgColor="blue" textColor="white">{f}</Tag>)}</>}
          </div>
          <div style={{display:"flex",alignItems:"baseline"}}>
            <h4 style={{marginRight:"15px",marginTop:"0px",marginBottom:"15px"}}>Calories: <span style={{color:"green"}}>{data.recipe.calories.toFixed(2)} </span></h4>
            <h4 style={{marginRight:"15px",marginTop:"0px",marginBottom:"15px"}}>Total Weight: <span style={{color:"green"}}>{data.recipe.totalWeight.toFixed(2)} gms </span></h4>
            <h4 style={{marginRight:"15px",marginTop:"0px",marginBottom:"15px"}}>Total Time Required: <span style={{color:"green"}}>{data.recipe.totalTime} mins </span></h4>
          </div>
          <div style={{display:"flex",alignItems:"baseline"}}>
            <h4 style={{marginRight:"5px",marginTop:"0px"}}>Ingredients </h4>
            <ul className = "Ingredients">
              {data.recipe.ingredientLines.map(f=> <li style={{color:"blue",marginBottom:"15px"}}>{f}</li>)}
            </ul>
          </div>
        </div>

      </div>
    )
  }
}

export default Result;

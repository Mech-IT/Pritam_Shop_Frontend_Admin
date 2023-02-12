import { css } from "styled-components"

export const mobile=(props)=>{
  return css`@media only screen and (min-width: 365px) and (max-width:600px) {
    ${props}
  }`
}

export const smallMobile=(props)=>{
  return css`@media only screen and (max-width:364px) {
    ${props}
  }`
}


export const tablet=(props)=>{
  return css`@media only screen and (min-width:601px) and (max-width:1050px) {
    ${props}
  }`
}
export const laptop=(props)=>{
  return css`@media only screen and (min-width:1050px) and (max-width:1300px)  {
    ${props}
  }`
}




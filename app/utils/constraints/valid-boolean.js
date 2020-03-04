export default function validBoolean(value) {
  if(value.datatype.value !== "http://www.w3.org/2001/XMLSchema#boolean"){
    return false;
  }
  const stringValue = value.value;

  return stringValue == "true" || stringValue == "false";
}

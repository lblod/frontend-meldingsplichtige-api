import { helper } from "@ember/component/helper";

async function filterLabel(formData) {
  await formData;
  await formData.type;
  debugger;
  for(let i=0; i<formData.type.length; i++)
  {
    await formData.type[i].conceptSchemes;
    for(let j=0; j<formData.type[i].conceptSchemes.length; j++)
    {
      if(formData.type[i].conceptSchemes[j].uuid=="67378dd0-5413-474b-8996-d992ef81637a")
      {
        return formData.type[i].label;
      }
    }
  }
  return "";
}

export default helper(filterLabel);

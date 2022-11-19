import React, { useState } from "react";
import { TagsInput } from "react-tag-input-component";
import './style.css'

export default function Tags() {
  const [selected, setSelected] = useState(['Notebook']);

  return (
    <div >
      <TagsInput
        value={selected}
        onChange={setSelected}
        name="tags"
        classNames={{tag:'tag-cls', input:'input-cls'}}
      />
    </div>
  );
}
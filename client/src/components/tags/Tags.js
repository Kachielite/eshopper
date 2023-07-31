import React, { useState } from "react";
import { TagsInput } from "react-tag-input-component";
import './style.css'

export default function Tags({setTags, tags}) {


  return (
    <div >
      <TagsInput
        value={tags}
        onChange={setTags}
        name="tags"
        classNames={{tag:'tag-cls', input:'input-cls'}}
      />
    </div>
  );
}
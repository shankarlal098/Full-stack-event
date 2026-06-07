export default function LanguageSelector({ language, onChange  }) {

  return (

    <select
      value={language}
      onChange={(e) => onChange(e.target.value)}
      className="select select-bordered select-info w-[170px]"
    >

      <option value="c++">
        C++
      </option>

      <option value="java">
        Java
      </option>

      <option value="javascript">
        JavaScript
      </option>

    </select>

  );

}
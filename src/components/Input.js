import React from "react";
import styled from "styled-components";

function Input({ leading, icons, ...props }) {
  return (
    <Formgroup>
      {leading && <div className="leading">{leading}</div>}

      <input
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
      />
      {icons && (
        <div
          className="icon"
          onClick={() => {
            props.onClick();
          }}
        >
          {icons}
        </div>
      )}
    </Formgroup>
  );
}

export default Input;

const Formgroup = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin: 1rem 0;
  background: #ffffff;
  border-radius: 10px;
  input {
    margin-left: 2rem;
    padding: 1rem;
    width: 100%;
    border: none;
    outline: none;
    background: transparent;
    color: #000000;
    font-size: 1rem;
  }
  .leading {
    position: absolute;
    transform: translateX(10px);
    left: 0.5rem;
    width: 20px;
    height: 20px;
  }
  .icon {
    position: absolute;
    right: 0.5rem;
    width: 30px;
    height: 30px;
  }
  svg {
    width: 100%;
    height: 100%;
  }
`;

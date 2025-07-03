import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Form from "react-bootstrap/Form";

export default function GearButton() {
  return (
    <DropdownButton
      id="dropdown-item-button"
      variant="secondary"
      title={<FontAwesomeIcon icon={faGear} />}
      autoClose={false}
      className="mt-2"
    >
      <Dropdown.Item> Import </Dropdown.Item>
      <Dropdown.Item> Export </Dropdown.Item>
      <div className="px-3">
        <Form.Check type="switch" id="custom-switch" label="Teacher mode" />
      </div>
      <Dropdown.Item> Lock to student mode </Dropdown.Item>
    </DropdownButton>
  );
}

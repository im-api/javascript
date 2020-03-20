import React, { Fragment } from "react";
import PropTypes from "prop-types";
import FieldGroup, { FieldGroupDefaultProps, FieldGroupProps } from "../field-group/FieldGroup";
import { getId } from "../GenerateId";
// Import required CSS.
import "./checkbox.css";

/**
 * Smallest component in the CheckboxGroup. Contains a label and the checkbox.
 *
 * @param {string} id The ID of te checkbox.
 * @param {string} label The label of the checkbox.
 *
 * @returns {React.Component} A React component that wraps around the HTML checkbox.
 */
const Checkbox = ( { id, label } ) => <Fragment>
	<input type="checkbox" id={ id } />
	<label htmlFor={ id } className="yoast-field-group__checkbox">{ label }</label>
</Fragment>;

Checkbox.propTypes = {
	label: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
};

/**
 * Component that renders a vertical list of checkboxes with their labels.
 *
 * @param {Object[]} options An array of options of the checkboxes.
 *
 * @returns {*} A React component that contains a list of vertical checkboxes.
 */
const VerticalCheckboxes = ( { options } ) => {
	return options.map( option => {
		const id = getId( option.id );
		return (
			<div className="yoast-field-group__checkbox">
				<Checkbox id={ id } label={ option.label } />
			</div>
		);
	} );
};

VerticalCheckboxes.propTypes = {
	options: PropTypes.arrayOf( PropTypes.shape( {
		label: PropTypes.string.isRequired,
		id: PropTypes.string,
	} ) ).isRequired,
};

/**
 * React component that renders a list of horizontal checkboxes.
 *
 * @param {object[]} options An array of checkbox options.
 *
 * @returns {*} A React component that renders a list of horizontal checkboxes.
 */
const HorizontalCheckboxes = ( { options } ) => {
	return <div className="yoast-field-group__checkbox yoast-field-group__checkbox--horizontal">
		{ options.map( option => {
			const id = getId( option.id );
			return <Checkbox label={ option.label } id={ id } />;
		} ) }
	</div>;
};

HorizontalCheckboxes.propTypes = {
	options: PropTypes.arrayOf( PropTypes.shape( {
		label: PropTypes.string.isRequired,
		id: PropTypes.string,
	} ) ).isRequired,
};

/**
 * This component renders a list of vertical or horizontal checkboxes based on the provided props.
 *
 * @param {object} props The props required for this component.
 *
 * @returns {React.Component} A list of checkboxes.
 */
const CheckboxGroup = ( props ) => {
	const id = getId( props.id );
	const fieldGroupProps = {
		htmlFor: id,
		...props,
	};

	return (
		<FieldGroup { ...fieldGroupProps } >
			{ props.vertical ?
				<VerticalCheckboxes options={ props.options } /> :
				<HorizontalCheckboxes options={ props.options } />
			}
		</FieldGroup>
	);
};

CheckboxGroup.propTypes = {
	options: PropTypes.arrayOf( PropTypes.shape( {
		label: PropTypes.string.isRequired,
		id: PropTypes.string,
	} ) ).isRequired,
	vertical: PropTypes.bool,
	...FieldGroupProps,
};

CheckboxGroup.defaultProps = {
	vertical: true,
	...FieldGroupDefaultProps,
};

export default CheckboxGroup;

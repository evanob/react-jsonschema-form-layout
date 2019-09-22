import React from "react"
import ObjectField from "react-jsonschema-form/lib/components/fields/ObjectField"
import { retrieveSchema } from "react-jsonschema-form/lib/utils"
import { Col } from "react-bootstrap"

export default class GridField extends ObjectField {
  state = { firstName: "hasldf" }
  render() {
    const {
      uiSchema,
      errorSchema,
      idSchema,
      required,
      disabled,
      readonly,
      onBlur,
      formData
    } = this.props
    const { definitions, fields, formContext } = this.props.registry
    const { SchemaField, TitleField, DescriptionField } = fields
    const schema = retrieveSchema(this.props.schema, definitions)
    const title = schema.title === undefined ? "" : schema.title

    const layout = uiSchema["ui:layout"]

    let LayoutWrapper = ({ children }) => <fieldset>{children}</fieldset>
    let RowElement = ({ children }) => <div className="row">{children}</div>
    let ItemElement = ({ children, itemProps, hide }) => {
      let style = {}
      if (hide) style = { display: "none" }
      return (
        <Col {...itemProps} style={style}>
          {children}
        </Col>
      )
    }

    const { layoutOptions: options } = formContext
    if (options && options.wrapper) LayoutWrapper = options.wrapper
    if (options && options.rowElement) RowElement = options.rowElement
    if (options && options.itemElement) ItemElement = options.itemElement

    return (
      <LayoutWrapper>
        {title ? (
          <TitleField
            id={`${idSchema.$id}__title`}
            title={title}
            required={required}
            formContext={formContext}
          />
        ) : null}
        {schema.description ? (
          <DescriptionField
            id={`${idSchema.$id}__description`}
            description={schema.description}
            formContext={formContext}
          />
        ) : null}
        {layout.map((row, rowIndex) => {
          return (
            <RowElement key={rowIndex}>
              {Object.keys(row).map((name, itemIndex) => {
                const { doShow, ...itemProps } = row[name]
                const hide = doShow && !doShow({ formData })
                if (schema.properties[name]) {
                  return (
                    <ItemElement key={[rowIndex, itemIndex]} itemProps={itemProps} hide={hide}>
                      <SchemaField
                        name={name}
                        required={this.isRequired(name)}
                        schema={schema.properties[name]}
                        uiSchema={uiSchema[name]}
                        errorSchema={errorSchema[name]}
                        idSchema={idSchema[name]}
                        formData={formData[name]}
                        onChange={this.onPropertyChange(name)}
                        onBlur={onBlur}
                        registry={this.props.registry}
                        disabled={disabled}
                        readonly={readonly}
                      />
                    </ItemElement>
                  )
                } else {
                  const { render, ...itemProps } = row[name]
                  let UIComponent = () => null

                  if (render) {
                    UIComponent = render
                  }

                  return (
                    <ItemElement key={index} itemProps={itemProps} hide={hide}>
                      <UIComponent
                        name={name}
                        formData={formData}
                        errorSchema={errorSchema}
                        uiSchema={uiSchema}
                        schema={schema}
                        registry={this.props.registry}
                      />
                    </ItemElement>
                  )
                }
              })}
            </RowElement>
          )
        })}
      </LayoutWrapper>
    )
  }
}

sap.ui.define(["sap/ui/base/Object"],
  function (BaseObject) {
    const ReactiveBinding = BaseObject.extend("erwinhalik.ui5.ReactiveBinding")

    ReactiveBinding.declare = function (model, {
      properties: observedProperties,
      dependOn: dependendProperties,
      shallBe: callbackFn
    }) {
      dependendProperties.forEach(dependendProperty => {
        const propertyBinding = model.bindProperty(dependendProperty)

        propertyBinding.attachChange(() => {
          const args = dependendProperties.map(p => model.getProperty(p))

          observedProperties.forEach(prop => model.setProperty(prop, callbackFn.apply(this, args)))
        })
      })
    }
    return ReactiveBinding
})
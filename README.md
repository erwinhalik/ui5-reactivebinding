# UI5 ReactiveBinding

ReactiveBinding is a library that brings reactivity to your UI5 project. It is best used in projects that strive for a Model View ViewModel (MVVM) architecture.


## ⚠️ Caution

This library is currently in development. The current API is a proposal and subject to change.

As of right now it is not intented for productive use, but for demonstration and research purposes only.

### Roadmap

1. ✅ Initial Commit
2. 🚧 Finalize API (feedback welcome)
3. ❌ Setup Unit Testing
4. ❌ Add NPM Installation Option
5. ❌ Add Typescript Support

<!-- ## Why MVVM over MVC?


## Why Reactivity matters
-->

## Getting Started


### Prerequisites

[SAPUI5](https://tools.hana.ondemand.com/#sapui5) or [OpenUI5](https://openui5.org/releases/) Version >= 1.38

### Installation

Simply copy the ReactiveBinding.js file into a suited folder in your webapp directory e.g. "lib".

Assuming you chose to put it into the lib folder, you can now include the library in your dependencies in the typical UI5 fashion:

```javascript
sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "your/namespace/lib/ReactiveBinding",
],
  function (Controller, ReactiveBinding) {
      const ExampleController = Controller.extend("your.namespace.controller.Example")

      ExampleController.prototype.onInit = function() {
        ReactiveBinding.declare(...)
      }
  }
)
```

Although not strictly necessary, it is good practice to have your dependency paths in sync with your global namespaces. I recommend you change the global identifier in the ReactiveBinding.js file from "erwinhalik.ui5.ReactiveBinding" to "your.namespace.lib.ReactiveBinding".

The "your namespace" examples shown are to be replaced by whatever you declared your namespace to be in the data-sap-ui-resourceroots attribute in your sap-iu-bootstrap script element in your webapp/index.html file. 


## API

### Methods


#### **ReactiveBinding.declare**
---
Declares a reactive binding on the given model. The values of the declared properties will be set to the return value of the given callback function, whenever the value of one of the dependend properties changes.

```javascript
ReactiveBinding.declare(jsonModel, bindingDecleration) : void
```

| Param | Type | Default Value | Description |
| ----------- | ----------- | ----------- | ----------- |
| jsonModel | sap.ui.model.json.JSONModel |  | The model the binding should be declared on |
| bindingDecleration | object | | Reactive Binding Info |
| &emsp;&emsp; properties | string[] | | The absolute paths of the declared properties |
| &emsp;&emsp; dependOn | string[] | | The absolute paths of the properties the declared properties depend on |
| &emsp;&emsp; shallBe | function(dependOnValue1, dependOnValue2, ...) : any | | The callback function to be invoked when the value of a depenend property changes. The parameters of the function will be the values of the properties defined in dependOn. The return value of the function is the value to which the declared properties will be set to. |
---

## Samples

Let's suppose we have a shipping application in which a user can input the weight of the shipment and dependend on that weight and the maximum allowed weight for a delivery by parcel service, the user interface should either hide, limit or disable other options like the chooseable delivery service.

If we bind for example the visible property of some controls to the value of a property in the JSONModel we call "exceedsParcelServiceMaxWeight" we can automatically hide and show these controls whenever the weight of the shipment is wihtin the max weight for a delivery by parcel service or not.

```javascript
sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "svt/svtwa/model/ReactiveBinding",
],
  function (Controller, JSONModel, ReactiveBinding) {
      const ExampleController = Controller.extend("your.namespace.controller.Example")

      ExampleController.prototype.onInit = function() {
        const model = new JSONModel({
          exceedsParcelServiceMaxWeight: false,
          parcelServiceMaxWeight: 30
          shipmentWeight: 0,
        })
        this.getView().setModel(model)
        
        ReactiveBinding.declare(model, {
          properties: ["/exceedsParcelServiceMaxWeight"],
          dependOn: ["/shipmentWeight", "/parcelServiceMaxWeight"],
          shallBe: (shipmentWeight, parcelServiceMaxWeight) => shipmentWeight > parcelServiceMaxWeight
        })
      }
  }
)
```

## License
MIT


## FAQ
Coming soon
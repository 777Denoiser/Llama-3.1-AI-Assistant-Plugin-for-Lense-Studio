const { Scene } = require('Scene');
const { PersistentStorageSystem } = require('PersistentStorageSystem');
const { Reactive } = require('Reactive');
const { TouchGestures } = require('TouchGestures');

class UI {
    constructor(queryHandler) {
        this.queryHandler = queryHandler;
        this.storage = PersistentStorageSystem.local;
    }

    async createInterface() {
        const scene = await Scene.root.findFirst('Scene');

        // Create bubble-themed UI elements
        const inputBubble = await scene.create("Plane", {
            name: "InputBubble",
            width: 0.8,
            height: 0.1,
            x: 0,
            y: 0.2
        });
        inputBubble.material = await this.createBubbleMaterial('#E0F7FA');

        const outputBubble = await scene.create("Plane", {
            name: "OutputBubble",
            width: 0.8,
            height: 0.3,
            x: 0,
            y: -0.2
        });
        outputBubble.material = await this.createBubbleMaterial('#B2EBF2');

        // Add text elements
        const inputText = await scene.create("Text", {
            name: "InputText",
            text: Reactive.val("Tap to ask a question..."),
            parent: inputBubble
        });

        const outputText = await scene.create("Text", {
            name: "OutputText",
            text: Reactive.val("AI response will appear here"),
            parent: outputBubble
        });

        // Add touch handlers
        TouchGestures.onTap(inputBubble).subscribe(() => {
            this.showKeyboard();
        });
    }

    async createBubbleMaterial(color) {
        const materials = await Materials.findUsingPattern('bubbleMaterial');
        const material = materials[0].clone();
        material.setParameter('baseColor', Reactive.RGBA(color));
        return material;
    }

    async showKeyboard() {
        // Show native keyboard and handle input
        const input = await NativeUI.keyboard.show("Ask a question");
        if (input !== null) {
            this.handleUserInput(input);
        }
    }

    async handleUserInput(input) {
        const inputText = await Scene.root.findFirst('InputText');
        inputText.text = Reactive.val(input);

        const outputText = await Scene.root.findFirst('OutputText');
        outputText.text = Reactive.val("Thinking...");

        const response = await this.queryHandler(input);
        this.displayResponse(response);
    }

    async displayResponse(response) {
        const outputText = await Scene.root.findFirst('OutputText');
        outputText.text = Reactive.val(response);
    }
}

module.exports = UI;

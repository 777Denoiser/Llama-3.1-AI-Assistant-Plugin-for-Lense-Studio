import Scene from 'Scene';
import Reactive from 'Reactive';
import TouchGestures from 'TouchGestures';
import NativeUI from 'NativeUI';
import Materials from 'Materials';

class UI {
    constructor(queryHandler) {
        this.queryHandler = queryHandler;
    }

    async createInterface() {
        const scene = await Scene.root.findFirst('Scene');

        // Create bubble-themed UI elements
        const inputBubble = await scene.createPlane({
            name: "InputBubble",
            width: 0.8,
            height: 0.1,
            x: Reactive.val(0),
            y: Reactive.val(0.2)
        });
        inputBubble.material = await this.createBubbleMaterial('#E0F7FA');

        const outputBubble = await scene.createPlane({
            name: "OutputBubble",
            width: 0.8,
            height: 0.3,
            x: Reactive.val(0),
            y: Reactive.val(-0.2)
        });
        outputBubble.material = await this.createBubbleMaterial('#B2EBF2');

        // Add text elements
        const inputText = await scene.createText({
            name: "InputText",
            text: "Tap to ask a question...",
            parent: inputBubble
        });

        const outputText = await scene.createText({
            name: "OutputText",
            text: "AI response will appear here",
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

    showLoadingState(message) {
        // Implement loading state UI
    }

    hideLoadingState() {
        // Hide loading state UI
    }

    showError(message) {
        // Display error message to user
    }
}

export default UI;
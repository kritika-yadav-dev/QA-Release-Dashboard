document.addEventListener("DOMContentLoaded", () => {
    const deployButton = document.getElementById("deployReleaseButton");
    const deploymentStatus = document.getElementById("deploymentStatus");

    // Elements that will be updated after deployment
    const releaseStatus = document.querySelector(".status-badge");

    const productionEnvironment = document.querySelector(
        ".environment-state.is-pending"
    );

    const productionPipeline = document.querySelector(
        ".pipeline-stage.is-current"
    );

    deployButton.addEventListener("click", () => {

        // Step 1: Start deployment
        deployButton.disabled = true;
        deployButton.textContent = "Deploying...";

        deploymentStatus.textContent =
            "Starting deployment...";


        // Step 2: Deploy application
        setTimeout(() => {
            deploymentStatus.textContent =
                "Deploying release v2.4.0 to Production...";
        }, 1500);


        // Step 3: Validate deployment
        setTimeout(() => {
            deploymentStatus.textContent =
                "Running post-deployment validation...";
        }, 3000);


        // Step 4: Deployment completed
        setTimeout(() => {

            deploymentStatus.textContent =
                "Deployment completed successfully.";


            // -----------------------------
            // Update Production Environment
            // -----------------------------

            if (productionEnvironment) {

                productionEnvironment.classList.remove(
                    "is-pending"
                );

                productionEnvironment.classList.add(
                    "is-deployed"
                );

                productionEnvironment.innerHTML =
                    '<span class="state-icon">&#10003;</span>Deployed';
            }


            // -----------------------------
            // Update Production Pipeline
            // -----------------------------

            if (productionPipeline) {

                productionPipeline.classList.remove(
                    "is-current"
                );

                productionPipeline.classList.add(
                    "is-complete"
                );

                const marker =
                    productionPipeline.querySelector(
                        ".stage-marker"
                    );

                if (marker) {
                    marker.textContent = "✓";
                }

                const pendingText =
                    productionPipeline.querySelector("small");

                if (pendingText) {
                    pendingText.textContent =
                        "Deployment successful";
                }
            }


            // -----------------------------
            // Update Release Status
            // -----------------------------

            if (releaseStatus) {

                releaseStatus.classList.remove(
                    "status-badge--ready"
                );

                releaseStatus.innerHTML =
                    '<span class="status-dot"></span>Deployed';
            }


            // -----------------------------
            // Update Deploy Button
            // -----------------------------

            deployButton.textContent =
                "Deployment Successful";

        }, 4500);
    });
});
import "reflect-metadata";
import "../shared/containers";
import { container } from "tsyringe";
import { UpdateCatalogUseCase } from "../modules/catalog/useCases/UpdateCatalogUseCase";

async function syncCatalog() {
  const updateCatalogUseCase = container.resolve(UpdateCatalogUseCase);

  console.log("Starting catalog synchronization...");
  await updateCatalogUseCase.execute();
  console.log("Catalog synchronization finished.");
}

syncCatalog();

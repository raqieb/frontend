import {
  Form,
  Header,
  FormField,
  SelectInput,
  SearchInput,
  ResourcesTable,
  EmptyListPlaceholder
} from '../components/app';
import {
  Loader,
  PageHeader
} from '../components/common';
import {
  useDeleteMaterial,
  useUpdateMaterial,
  useCreateMaterial,
  useGetMaterial,
  useGetMaterials
} from '../hooks/materials';
import {
  useGetMaterialsCategories
} from '../hooks/materialsCategories';


export const Materials = () => {
  const {
    materials,
    refreshMaterials,
    isLoading: isFetchingMaterials
  } = useGetMaterials();
  const {
    handleDelete,
    isLoading: isDeletingMaterial
  } = useDeleteMaterial();

  const deleteHandler = (e) => {
    handleDelete(
      e.currentTarget.getAttribute('data-id'),
      refreshMaterials
    );
  }

  const isLoading = isFetchingMaterials || isDeletingMaterial;

  return (
    <section>
      {
        isLoading
          ?<Loader />
          :<>
            <Header
              value='Materials'
              isEmptyList={materials.length === 0}
              link={{
                path: '/app/materials/items/create',
                name: 'New Material',
              }}
            />
            {
              materials.length === 0
                ?<EmptyListPlaceholder
                  listName='materials'
                  link={{
                    path: '/app/materials/items/create',
                    name: 'Create Material',
                  }}
                />
                :<>
                  <SearchInput resourceName='materials' />
                  <ResourcesTable
                    resourceName='material'
                    resourcePath='/materials/items'
                    resources={materials}
                    handleDelete={deleteHandler}
                  />
                </>
            }
          </>
      }
    </section>
  );
}

export const MaterialCreate = () => {
  const { isLoading, handleCreate } = useCreateMaterial();
  const {
    categories,
    isLoading: isFetchingCategories
  } = useGetMaterialsCategories();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData);
    handleCreate(payload);
  }

  return (
    <section>
      {
        isFetchingCategories
          ?<Loader />
          :<>
            <PageHeader value='New Material' />
            <Form
              legend='Material Details'
              onSubmit={handleSubmit}
              isLoading={isLoading}
            >
              <FormField
                label='Name'
                type='text'
                name='name'
                disabled={isLoading}
              />
              <SelectInput
                label='Category'
                name='categoryId'
                options={categories}
                disabled={isLoading}
              />
            </Form>
          </>
      }
    </section>
  );
}

export const MaterialUpdate = () => {
  const {
    material,
    isLoading: isFetchingMaterial
  } = useGetMaterial();
  const {
    categories,
    isLoading: isFetchingCategories
  } = useGetMaterialsCategories();
  const { isLoading, handleUpdate } = useUpdateMaterial();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData);
    handleUpdate(payload);
  }
    
  return (
    <section>
      {
        isFetchingMaterial || isFetchingCategories
          ?<Loader />
          :<>
            <PageHeader value='Update Material' />
            <Form
              legend='Material Details'
              onSubmit={handleSubmit}
              isLoading={isLoading}
            >
              <FormField
                label='Name'
                type='text'
                name='name'
                value={material.name}
                disabled={isLoading}
              />
              <SelectInput
                label='Category'
                name='categoryId'
                value={material.categoryId}
                options={categories}
                disabled={isLoading}
              />
            </Form>
          </>
      }
    </section>
  );
}

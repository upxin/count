<script lang="tsx">
import { defineComponent } from 'vue';
import Draggable from 'vuedraggable';
// eslint-disable-next-line import/no-self-import
import NestedItem from './NestedItem.vue';

function cloneDeep(data: any) {
  return JSON.parse(JSON.stringify(data));
}

export default defineComponent({
  name: 'NestedItem',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const cloneItem = (item: any) => {
      return cloneDeep(item);
    };

    const a = 123;

    return () => (
      <div class="border-1px border-amber border-solid p-20px">
        <n-button class="">{props.item.name}</n-button>
        {props.item.children && (
          <Draggable
            list={props.item.children}
            group="people"
            itemKey="name"
            clone={cloneItem}
            class="w-full h-80px"
          >
            {{
              item: ({ element }: { element: any }) => (
                <NestedItem item={element} />
              ),
            }}
          </Draggable>
        )}
      </div>
    );
  },
});
</script>

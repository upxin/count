import { defineComponent, ref, watch } from 'vue';
import Draggable from 'vuedraggable';
import { NGridItem, NTag } from 'naive-ui';
import type { DragSchema } from './interface';
import { DragItemProps } from './interface';
import RenderComponent from './RenderComponent.vue';

export default defineComponent({
  name: 'DraggableItem',
  props: DragItemProps,
  setup(props) {
    const innerList = ref<DragSchema[]>([]);
    const components = {
      colFormItem: () => (
        <div>
          <div bg-fuchsia>{props.item?.colName}</div>
        </div>
      ),
      areaFormItem: () => (
        <Draggable
          group="dragComponent"
          list={props.tasks || innerList.value}
          item-key="name"
          class="border-1px border-amber border-solid min-h-100px m-10px"
        >
          {{
            item: ({ element }: { element: DragSchema }) => (
              <div class="bg-blue">
                <RenderComponent name={element.tag}></RenderComponent>
                {/* 如果这里拖过来的还是一个container组件 那么需要继续能够拖动  所以需要继续if */}
              </div>
            ),
          }}
        </Draggable>
      ),
    };
    return () => (
      <div>
        {props.item?.layout && components[props.item.layout] ? components[props.item.layout]() : null}
      </div>
    );
  },
});

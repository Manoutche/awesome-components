import { animate, group, query, sequence, state, style, transition, trigger, useAnimation } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Comment } from 'src/app/core/models/comment.model';
import { flashAnimation } from '../../animations/flash.animation';
import { slideAndFalde } from '../../animations/slide-and-falde.animation';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  animations: [
    trigger('listItem', [
      state('default', style({
        transform: 'scale(1)',
        backgroundColor: 'white',
        'z-index': 1
      })),
      state('active', style({
        transform: 'scale(1.05)',
        'background-color': 'rgb(201, 157, 242)',
        zIndex: 2
      })),
      transition('default => active', [
        animate('100ms ease-in-out')
      ]),
      transition('active => default', [
        animate('500ms ease-in-out')
      ]),
      transition('void => *', [
        query('.comment-text, .comment-date',[
          style({
            opacity: 0
          })
        ]),
        useAnimation(slideAndFalde,{
          params :{
            time :'2000ms',
            startColor: 'rgb(201,157,242)'
          }
        }),
        group([
          useAnimation(flashAnimation,{
            params:{
              time: '1000ms',
              flashColor : 'rgb(227, 103, 45)'
            }
          }),
          style({
            'background-color': 'rgb(255, 7, 147)'
          }),
          query('.comment-text',[
            animate('500ms', style({
              opacity: 1
            })
            )
          ]),
          query('.comment-date',[
            animate('1000ms', style({
              opacity: 1
            })
            )
          ])
        ]),
      ])
    ])
  ]
})
export class CommentsComponent implements OnInit {
  onlistLevae(index : number) {
  this.animateState[index] = 'default'
  }
  onlistEnter(index : number) {
    this.animateState[index]  = 'active'
  }

  @Input() comment!: Comment[]
  @Output() newComment = new EventEmitter<string>()

  commenCtrl!: FormControl
  animateState: {[key: number]: 'default' | 'active'} = {}
  constructor(private formBuild : FormBuilder){}

  ngOnInit(): void {
    this.commenCtrl = this.formBuild.control('',[Validators.required, Validators.minLength(10)])
    for (let index in this.comment) {
      this.animateState[index] = 'default'

    }
  }

  leaveComment(){
    if (this.commenCtrl.invalid) {
      return;
    }
    const maxId = Math.max(...this.comment.map(com => com.id))
    this.comment.unshift({
      id: maxId + 1,
      comment: this.commenCtrl.value,
      createdDate: new Date().toISOString(),
      userId: 0
    })
    this.newComment.emit(this.commenCtrl.value)
    this.commenCtrl.reset()
  }
}
